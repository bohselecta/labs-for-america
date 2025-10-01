import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deployment Guide - LabsForAmerica",
  description: "Step-by-step guide to deploy your LabsForAmerica template",
};

export default function DeployPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-8 font-headline">🚀 Deployment Guide</h1>
        
        <p className="text-xl text-gray-600 mb-8 font-body">
          Get your LabsForAmerica template up and running in under 20 minutes. No coding experience required.
        </p>

        <h2 className="text-2xl font-semibold mb-4 font-headline">Quick Deploy (Recommended)</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-800 font-medium mb-4">
            🎯 <strong>Fastest way:</strong> Use our one-click deploy buttons on the <a href="/templates" className="text-blue-600 hover:text-blue-500 underline">Templates page</a>
          </p>
          <ol className="space-y-2 text-blue-800">
            <li>1. Choose your template</li>
            <li>2. Upload your logo</li>
            <li>3. Click "Deploy to Vercel"</li>
            <li>4. Your site goes live instantly!</li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mb-4 font-headline">Manual Deployment</h2>
        
        <h3 className="text-xl font-semibold mb-3 font-headline">Step 1: Create a GitHub Account</h3>
        <p className="text-gray-600 mb-4 font-body">
          If you don't have one, visit <a href="https://github.com" className="text-blue-600 hover:text-blue-500">github.com</a> and sign up for a free account.
        </p>

        <h3 className="text-xl font-semibold mb-3 font-headline">Step 2: Create a New Repository</h3>
        <ol className="space-y-3 mb-6">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            <span className="font-body">Click the "+" icon in the top right corner of GitHub</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            <span className="font-body">Select "New repository"</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            <span className="font-body">Name it something like "our-city-labs" or "department-portal"</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
            <span className="font-body">Make it <strong>Public</strong> (required for free Vercel hosting)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">5</span>
            <span className="font-body">Click "Create repository"</span>
          </li>
        </ol>

        <h3 className="text-xl font-semibold mb-3 font-headline">Step 3: Upload Template Files</h3>
        <ol className="space-y-3 mb-6">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            <span className="font-body">Download your template from the <a href="/templates" className="text-blue-600 hover:text-blue-500">Templates page</a></span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            <span className="font-body">Extract the ZIP file on your computer</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            <span className="font-body">Drag and drop all files into your GitHub repository</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
            <span className="font-body">Add a commit message like "Initial template upload"</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">5</span>
            <span className="font-body">Click "Commit changes"</span>
          </li>
        </ol>

        <h3 className="text-xl font-semibold mb-3 font-headline">Step 4: Deploy to Vercel</h3>
        <ol className="space-y-3 mb-6">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            <span className="font-body">Visit <a href="https://vercel.com" className="text-blue-600 hover:text-blue-500">vercel.com</a> and sign up with your GitHub account</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            <span className="font-body">Click "New Project"</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            <span className="font-body">Select your repository from the list</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
            <span className="font-body">Click "Deploy" (no configuration needed!)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">5</span>
            <span className="font-body">Wait 2-3 minutes for deployment to complete</span>
          </li>
        </ol>

        <h3 className="text-xl font-semibold mb-3 font-headline">Step 5: Customize Your Domain (Optional)</h3>
        <p className="text-gray-600 mb-4 font-body">
          Your site will be live at a <code className="bg-gray-100 px-2 py-1 rounded text-sm">your-project.vercel.app</code> URL. 
          To use a custom domain:
        </p>
        <ol className="space-y-2 mb-6">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body">Go to your project settings in Vercel</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body">Click "Domains" and add your custom domain</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body">Follow the DNS setup instructions</span>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4 font-headline">Setting Up Authentication (Optional)</h2>
        <p className="text-gray-600 mb-4 font-body">
          For production use, you'll want to replace the demo authentication with a real system:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h4 className="font-semibold mb-3">Quick Start with Clerk:</h4>
          <ol className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span className="font-body">Sign up at <a href="https://clerk.com" className="text-blue-600 hover:text-blue-500">clerk.com</a></span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span className="font-body">Create a new application</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span className="font-body">Copy your API keys to Vercel environment variables</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span className="font-body">Replace the fake auth with Clerk components</span>
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mb-4 font-headline">Need Help?</h2>
        <p className="text-gray-600 mb-8 font-body">
          If you run into any issues, check out our <a href="/docs/about" className="text-blue-600 hover:text-blue-500">About page</a> 
          or the <a href="/docs/for-feds" className="text-blue-600 hover:text-blue-500">Federal Employees guide</a> for more context.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-green-800 font-medium">
            🎉 <strong>That's it!</strong> Your civic portal is now live and ready to serve your community.
          </p>
        </div>
      </div>
    </main>
  );
}
