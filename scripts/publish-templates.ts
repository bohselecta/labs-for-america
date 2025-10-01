import { execSync } from "child_process";
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const srcRoot = path.join(process.cwd(), "templates-src");
const outputDir = path.join(process.cwd(), "templates-dist");

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Check if templates-src exists
if (!existsSync(srcRoot)) {
  console.log("❌ templates-src directory not found. Creating sample structure...");
  mkdirSync(srcRoot, { recursive: true });
  
  // Create sample template directories
  const templates = ["civic", "justice", "edu", "health"];
  templates.forEach(template => {
    const templateDir = path.join(srcRoot, template);
    mkdirSync(templateDir, { recursive: true });
    
    // Create a basic README for each template
    writeFileSync(
      path.join(templateDir, "README.md"),
      `# ${template.charAt(0).toUpperCase() + template.slice(1)}Labs Template

This is a sample template for ${template} organizations.

## Quick Start
1. Upload this template to GitHub
2. Deploy to Vercel
3. Customize with your logo and branding

See /docs/deploy.md for detailed instructions.
`
    );
  });
  
  console.log("✅ Created sample template structure in templates-src/");
  console.log("📝 Add your actual template files to templates-src/ before running this script again.");
  process.exit(0);
}

// Get all template directories
const folders = readdirSync(srcRoot, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

if (folders.length === 0) {
  console.log("❌ No template directories found in templates-src/");
  process.exit(1);
}

console.log(`🚀 Publishing ${folders.length} templates to Vercel Blob...`);
console.log(`📁 Source: ${srcRoot}`);
console.log(`📦 Output: ${outputDir}`);

const templateUrls: Record<string, string> = {};

for (const folder of folders) {
  const folderPath = path.join(srcRoot, folder);
  const zipPath = path.join(outputDir, `${folder}.zip`);

  try {
    console.log(`\n📦 Zipping ${folder}...`);
    
    // Remove existing zip if it exists
    if (existsSync(zipPath)) {
      execSync(`rm ${zipPath}`);
    }
    
    // Create zip file
    execSync(`zip -r ${zipPath} .`, { 
      cwd: folderPath, 
      stdio: "inherit" 
    });

    console.log(`☁️ Uploading ${folder}.zip to Vercel Blob...`);
    
    // Upload to Vercel Blob
    const output = execSync(`npx vercel blob put ${zipPath} --public`, { 
      encoding: "utf-8",
      stdio: "pipe"
    });
    
    // Extract URL from output
    const urlMatch = output.match(/https:\/\/[^\s]+\.zip/);
    if (urlMatch) {
      templateUrls[folder] = urlMatch[0];
      console.log(`✅ ${folder}: ${urlMatch[0]}`);
    } else {
      console.log(`❌ Failed to extract URL for ${folder}`);
      console.log(`Output: ${output}`);
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${folder}:`, error);
  }
}

// Generate template map JSON
const templateMap = {
  generatedAt: new Date().toISOString(),
  templates: templateUrls,
  count: Object.keys(templateUrls).length
};

const mapPath = path.join(outputDir, "template-map.json");
writeFileSync(mapPath, JSON.stringify(templateMap, null, 2));

console.log(`\n📋 Template Map Generated: ${mapPath}`);
console.log(`\n🔗 Template URLs:`);
Object.entries(templateUrls).forEach(([name, url]) => {
  console.log(`  ${name}: ${url}`);
});

// Upload template map to blob as well
try {
  console.log(`\n☁️ Uploading template-map.json to Vercel Blob...`);
  const mapOutput = execSync(`npx vercel blob put ${mapPath} --public`, { 
    encoding: "utf-8",
    stdio: "pipe"
  });
  
  const mapUrlMatch = mapOutput.match(/https:\/\/[^\s]+\.json/);
  if (mapUrlMatch) {
    console.log(`✅ Template Map: ${mapUrlMatch[0]}`);
    
    // Update the template map with its own URL
    (templateMap as any).mapUrl = mapUrlMatch[0];
    writeFileSync(mapPath, JSON.stringify(templateMap, null, 2));
  }
} catch (error) {
  console.error(`❌ Error uploading template map:`, error);
}

console.log(`\n🎉 Publishing complete!`);
console.log(`📝 Next steps:`);
console.log(`  1. Update your download API with the URLs above`);
console.log(`  2. Or use the template-map.json URL for dynamic loading`);
console.log(`  3. Test downloads at /api/download?id=civic`);
