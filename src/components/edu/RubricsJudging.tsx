import React, { useState } from 'react';

export interface RubricCriterion {
  name: string;
  weight: number;
  description: string;
  maxScore: number;
}

export interface Rubric {
  id: string;
  labId: string;
  name: string;
  criteria: RubricCriterion[];
  createdAt: Date;
}

export interface Score {
  id: string;
  submissionId: string;
  judgeId: string;
  rubric: Record<string, number>; // criterion name -> score
  total: number;
  comments?: string;
  createdAt: Date;
}

export interface Submission {
  id: string;
  teamId: string;
  teamName: string;
  roundId: string;
  title: string;
  links: string[];
  files: string[];
  notes: string;
  createdAt: Date;
}

export interface RubricsJudgingProps {
  labId: string;
  rubrics: Rubric[];
  submissions: Submission[];
  scores: Score[];
  judges: Array<{ id: string; name: string; email: string }>;
  currentJudgeId?: string;
  onCreateRubric: (rubric: Omit<Rubric, 'id' | 'createdAt'>) => Promise<void>;
  onScoreSubmission: (score: Omit<Score, 'id' | 'createdAt'>) => Promise<void>;
  isOrganizer?: boolean;
}

export function RubricsJudging({ 
  labId, 
  rubrics, 
  submissions, 
  scores,
  judges,
  currentJudgeId,
  onCreateRubric, 
  onScoreSubmission,
  isOrganizer = false
}: RubricsJudgingProps) {
  const [selectedRubric, setSelectedRubric] = useState<Rubric | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isCreatingRubric, setIsCreatingRubric] = useState(false);
  const [isScoring, setIsScoring] = useState(false);

  const getSubmissionScores = (submissionId: string) => {
    return scores.filter(score => score.submissionId === submissionId);
  };

  const getAverageScore = (submissionId: string) => {
    const submissionScores = getSubmissionScores(submissionId);
    if (submissionScores.length === 0) return 0;
    
    const total = submissionScores.reduce((sum, score) => sum + score.total, 0);
    return total / submissionScores.length;
  };

  const getJudgeScore = (submissionId: string, judgeId: string) => {
    return scores.find(score => score.submissionId === submissionId && score.judgeId === judgeId);
  };

  const handleCreateRubric = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const criteria: RubricCriterion[] = [];
    const criterionNames = formData.getAll('criterionName') as string[];
    const criterionWeights = formData.getAll('criterionWeight') as string[];
    const criterionDescriptions = formData.getAll('criterionDescription') as string[];
    const criterionMaxScores = formData.getAll('criterionMaxScore') as string[];

    for (let i = 0; i < criterionNames.length; i++) {
      if (criterionNames[i].trim()) {
        criteria.push({
          name: criterionNames[i].trim(),
          weight: parseFloat(criterionWeights[i]) || 1,
          description: criterionDescriptions[i].trim(),
          maxScore: parseFloat(criterionMaxScores[i]) || 10
        });
      }
    }

    try {
      await onCreateRubric({
        labId,
        name: formData.get('name') as string,
        criteria
      });
      
      setIsCreatingRubric(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to create rubric:', error);
    }
  };

  const handleScoreSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission || !selectedRubric || !currentJudgeId) return;

    setIsScoring(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const rubricScores: Record<string, number> = {};
      let total = 0;

      selectedRubric.criteria.forEach(criterion => {
        const score = parseFloat(formData.get(`score_${criterion.name}`) as string) || 0;
        rubricScores[criterion.name] = score;
        total += score * criterion.weight;
      });

      await onScoreSubmission({
        submissionId: selectedSubmission.id,
        judgeId: currentJudgeId,
        rubric: rubricScores,
        total,
        comments: formData.get('comments') as string
      });

      setSelectedSubmission(null);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to score submission:', error);
    } finally {
      setIsScoring(false);
    }
  };

  const getWinners = () => {
    return submissions
      .map(sub => ({
        ...sub,
        averageScore: getAverageScore(sub.id),
        scoreCount: getSubmissionScores(sub.id).length
      }))
      .filter(sub => sub.scoreCount > 0)
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 3);
  };

  const winners = getWinners();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Rubrics & Judging</h1>
        <p className="text-gray-600 mb-4">
          Create rubrics, score submissions, and identify winners. Judges can evaluate submissions based on defined criteria.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Judging Process</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Create rubrics with weighted criteria</li>
            <li>• Judges score submissions independently</li>
            <li>• Average scores determine rankings</li>
            <li>• Winners are displayed publicly</li>
          </ul>
        </div>
      </div>

      {/* Rubrics Management */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Rubrics</h2>
          {isOrganizer && (
            <button
              onClick={() => setIsCreatingRubric(true)}
              className="btn-primary"
            >
              Create Rubric
            </button>
          )}
        </div>

        {rubrics.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No rubrics created yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rubrics.map((rubric) => (
              <div key={rubric.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{rubric.name}</h3>
                  <button
                    onClick={() => setSelectedRubric(rubric)}
                    className="btn-secondary"
                  >
                    Use for Judging
                  </button>
                </div>

                <div className="grid gap-4">
                  {rubric.criteria.map((criterion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{criterion.name}</h4>
                        <div className="flex gap-2">
                          <span className="badge badge-info">Weight: {criterion.weight}</span>
                          <span className="badge badge-secondary">Max: {criterion.maxScore}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{criterion.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submissions & Scoring */}
      {selectedRubric && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Score Submissions</h2>
          <p className="text-gray-600 mb-4">Using rubric: <strong>{selectedRubric.name}</strong></p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((submission) => {
              const averageScore = getAverageScore(submission.id);
              const judgeScore = currentJudgeId ? getJudgeScore(submission.id, currentJudgeId) : null;
              const scoreCount = getSubmissionScores(submission.id).length;

              return (
                <div key={submission.id} className="card p-6">
                  <h3 className="font-semibold mb-2">{submission.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Team: {submission.teamName}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Average Score:</span>
                      <span className="font-medium">{averageScore.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Judges:</span>
                      <span>{scoreCount}</span>
                    </div>
                    {judgeScore && (
                      <div className="flex justify-between text-sm">
                        <span>Your Score:</span>
                        <span className="font-medium">{judgeScore.total.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="btn-primary w-full"
                    >
                      {judgeScore ? 'Update Score' : 'Score Submission'}
                    </button>
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="btn-secondary w-full"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Winners */}
      {winners.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Winners</h2>
          <div className="space-y-4">
            {winners.map((winner, index) => (
              <div key={winner.id} className={`card p-6 ${
                index === 0 ? 'ring-2 ring-yellow-400 bg-yellow-50' :
                index === 1 ? 'ring-2 ring-gray-300 bg-gray-50' :
                'ring-2 ring-orange-300 bg-orange-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{winner.title}</h3>
                  </div>
                  <span className="text-lg font-bold">{winner.averageScore.toFixed(1)}</span>
                </div>
                <p className="text-gray-600">Team: {winner.teamName}</p>
                <p className="text-sm text-gray-500">
                  Scored by {winner.scoreCount} judge{winner.scoreCount !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Rubric Modal */}
      {isCreatingRubric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Create Rubric</h2>
                <button
                  onClick={() => setIsCreatingRubric(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateRubric} className="space-y-4">
                <div>
                  <label htmlFor="rubricName" className="block text-sm font-medium text-gray-700 mb-2">
                    Rubric Name *
                  </label>
                  <input
                    type="text"
                    id="rubricName"
                    name="name"
                    className="form-field"
                    placeholder="Enter rubric name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Criteria *
                  </label>
                  <div id="criteria-container" className="space-y-3">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Criterion Name
                            </label>
                            <input
                              type="text"
                              name="criterionName"
                              className="form-field"
                              placeholder="e.g., Innovation"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Weight
                            </label>
                            <input
                              type="number"
                              name="criterionWeight"
                              className="form-field"
                              placeholder="1.0"
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              name="criterionDescription"
                              className="form-field"
                              rows={2}
                              placeholder="Describe what this criterion measures"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Max Score
                            </label>
                            <input
                              type="number"
                              name="criterionMaxScore"
                              className="form-field"
                              placeholder="10"
                              min="1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="btn-primary">
                    Create Rubric
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsCreatingRubric(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Score Submission Modal */}
      {selectedSubmission && selectedRubric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Score Submission</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold">{selectedSubmission.title}</h3>
                <p className="text-gray-600">Team: {selectedSubmission.teamName}</p>
              </div>

              <form onSubmit={handleScoreSubmission} className="space-y-4">
                {selectedRubric.criteria.map((criterion) => (
                  <div key={criterion.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{criterion.name}</h4>
                      <div className="flex gap-2">
                        <span className="badge badge-info">Weight: {criterion.weight}</span>
                        <span className="badge badge-secondary">Max: {criterion.maxScore}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{criterion.description}</p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Score (0 - {criterion.maxScore})
                      </label>
                      <input
                        type="number"
                        name={`score_${criterion.name}`}
                        className="form-field"
                        min="0"
                        max={criterion.maxScore}
                        step="0.1"
                        required
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                    Comments
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    className="form-field"
                    rows={4}
                    placeholder="Provide feedback and comments for the team..."
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    disabled={isScoring}
                    className="btn-primary"
                  >
                    {isScoring ? 'Scoring...' : 'Submit Score'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedSubmission(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
