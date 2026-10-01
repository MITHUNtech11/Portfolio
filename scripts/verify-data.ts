import { profileData } from '../src/data/profile';
import { projectsData } from '../src/data/projects';
import { skillsData } from '../src/data/skills';
import { experienceData } from '../src/data/experience';
import { educationData } from '../src/data/education';
import { certificatesData } from '../src/data/certificates';

// 1. Verify Profile
if (!profileData.name || !profileData.headline || !profileData.email) {
  throw new Error('Profile data is missing core fields (name, headline, email)');
}
if (!profileData.recruiterStats || profileData.recruiterStats.length < 4) {
  throw new Error('Profile data must include at least 4 recruiter stats');
}

// 2. Verify Projects
if (!Array.isArray(projectsData) || projectsData.length < 3) {
  throw new Error(`Expected at least 3 projects, received ${projectsData?.length}`);
}

for (const project of projectsData) {
  if (!project.id || !project.title || !project.description || !project.overview) {
    throw new Error(`Project ${project.id || 'unknown'} missing title, description, or overview`);
  }
  if (!project.diagrams || project.diagrams.length === 0) {
    throw new Error(`Project ${project.id} must have at least one architecture diagram`);
  }
  for (const diagram of project.diagrams) {
    if (!diagram.title || !diagram.src || !diagram.caption) {
      throw new Error(`Project ${project.id} diagram missing title, src, or caption`);
    }
  }
  if (!project.pipeline || project.pipeline.length === 0) {
    throw new Error(`Project ${project.id} must have pipeline steps`);
  }
  if (!project.metrics || project.metrics.length === 0) {
    throw new Error(`Project ${project.id} must have metric badges`);
  }
  if (!project.challenges || project.challenges.length === 0) {
    throw new Error(`Project ${project.id} must have technical challenges`);
  }
  if (!project.tags || project.tags.length === 0) {
    throw new Error(`Project ${project.id} must have technical tags`);
  }
}

// 3. Verify Skills
if (!Array.isArray(skillsData) || skillsData.length < 4) {
  throw new Error(`Expected at least 4 skill categories, received ${skillsData?.length}`);
}
for (const category of skillsData) {
  if (!category.id || !category.title || !category.skills || category.skills.length === 0) {
    throw new Error(`Skill category ${category.id} has invalid structure or empty skills list`);
  }
}

// 4. Verify Experience
if (!Array.isArray(experienceData) || experienceData.length < 2) {
  throw new Error(`Expected at least 2 experience entries, received ${experienceData?.length}`);
}
for (const exp of experienceData) {
  if (!exp.role || !exp.company || !exp.period || !exp.subprojects || exp.subprojects.length === 0) {
    throw new Error(`Experience entry at ${exp.company} is missing role, period, or subprojects`);
  }
}

// 5. Verify Education
if (!Array.isArray(educationData) || educationData.length < 3) {
  throw new Error(`Expected at least 3 education entries, received ${educationData?.length}`);
}
for (const edu of educationData) {
  if (!edu.institution || !edu.degree || !edu.period || !edu.score) {
    throw new Error(`Education entry at ${edu.institution} is missing required fields`);
  }
}

// 6. Verify Certificates
if (!Array.isArray(certificatesData) || certificatesData.length < 7) {
  throw new Error(`Expected at least 7 certificates, received ${certificatesData?.length}`);
}
for (const cert of certificatesData) {
  if (!cert.id || !cert.title || !cert.issuer || !cert.image) {
    throw new Error(`Certificate ${cert.id || 'unknown'} is missing id, title, issuer, or image`);
  }
}

console.log(`✅ Data validation successful:`);
console.log(`   - Profile: ${profileData.name} (${profileData.headline})`);
console.log(`   - Recruiter Stats: ${profileData.recruiterStats.length} items`);
console.log(`   - Projects: ${projectsData.length} systems with architecture diagrams & metrics`);
console.log(`   - Skill Categories: ${skillsData.length} categories with total ${skillsData.reduce((acc, c) => acc + c.skills.length, 0)} skills`);
console.log(`   - Experience: ${experienceData.length} corporate internships with ${experienceData.reduce((acc, e) => acc + e.subprojects.length, 0)} subprojects`);
console.log(`   - Education: ${educationData.length} academic institutions`);
console.log(`   - Certificates: ${certificatesData.length} verified credentials`);
