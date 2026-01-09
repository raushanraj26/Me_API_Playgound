const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


//post endpoint to test JSON body parsing
app.post("/test", (req, res) => {
  res.json({
    message: "Data received",
    data: req.body
  });
});


// In-memory storage
let profile = null;
//user data dega wahi profile me store hoga, so Post method use kr rhe
//har bar data aayega profile data overwrite ho jaayega
app.post("/profile", (req, res) => {
  profile = req.body;
  res.status(201).json({
    message: "Profile stored in memory",
    profile: profile
  });
});

//ab jo data store hua hai use get(READ or retrieve) kaise karna hai,use GET method to see  what data is stored in memory
app.get("/profile",(req,res)=>{
  if(!profile){
    return res.status(404).json({message:"No profile found inmemory"});
  }
  res.json(profile);
});
//ab jo existing profile data hai use me update means add or delete krna hai to use pUT method
app.put("/profile", (req, res) => {
  if (!profile) {
    return res.status(404).json({
      message: "No profile to update"
    });
  }

  profile = {
    ...profile,
    ...req.body
  };

  res.json({
    message: "Profile updated",
    profile: profile
  });
});


                  //ab humlog project ko add kr rhe and read (GET) kr rhe

//humlog existing profile me project ko add kar rahe
//We do not replace profile data,we just add project to existing profile data
// app.post("/profile/projects",(req,res)=>{})
  app.post("/projects", (req, res) => { 
  if (!profile) {
    return res.status(404).json({
      message: "Create profile first"
    });
  }

  if (!profile.projects) {
    profile.projects = [];
  }

  const project = req.body;
  profile.projects.push(project);

  res.status(201).json({
    message: "Project added",
    projects: profile.projects
  });
});

//get all projects from profile
app.get("/projects", (req, res) => {
  if (!profile || !profile.projects) {
    return res.json([]);
  }

  res.json(profile.projects);
});

//search projects by title or description
app.get("/projects/search", (req, res) => {
  if (!profile || !profile.projects) {
    return res.json([]);
  }
            // req.query.search reads the value of the query parameter named search from the URL.
            // /projects/search?search=abc then express converts into req.query = { search: "abc" }
            // so req.query.search === "abc"

  const query = req.query.search;

  if (!query) {
    return res.status(400).json({
      message: "Search query is required"
    });
  }

  const results = profile.projects.filter(project =>
    project.title.toLowerCase().includes(query.toLowerCase()) ||
    project.description.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
});

                       //update and delete skills


//app.get("profile/skills"(req,res))
app.get("/skills", (req, res) => {
  if (!profile || !profile.skills) {
    return res.json([]);
  }

  res.json(profile.skills);
});

//add skill
app.post("/skills", (req, res) => {
  if (!profile) {
    return res.status(404).json({
      message: "Create profile first"
    });
  }

  const { skill } = req.body;

  if (!skill) {
    return res.status(400).json({
      message: "Skill is required"
    });
  }

  if (!profile.skills) {
    profile.skills = [];
  }

  if (profile.skills.includes(skill)) {
    return res.status(409).json({
      message: "Skill already exists"
    });
  }

  profile.skills.push(skill);

  res.status(201).json({
    message: "Skill added",
    skills: profile.skills
  });
});



                                                  //delete skill and project




  //delete skills,user give skill in the form of  body
app.delete("/skills", (req, res) => {
  if (!profile || !profile.skills) {
    return res.status(404).json({
      message: "No skills found"
    });
  }

  const { skill } = req.body;

  if (!skill) {
    return res.status(400).json({
      message: "Skill is required"
    });
  }

  const index = profile.skills.indexOf(skill);

  if (index === -1) {
    return res.status(404).json({
      message: "Skill not found"
    });
  }

  profile.skills.splice(index, 1);

  res.json({
    message: "Skill deleted",
    skills: profile.skills
  });
});


//delete project by title
app.delete("/projects", (req, res) => {
  if (!profile || !profile.projects) {
    return res.status(404).json({
      message: "No projects found"
    });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Project title is required"
    });
  }

  const index = profile.projects.findIndex(
    project => project.title === title
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  profile.projects.splice(index, 1);

  res.json({
    message: "Project deleted",
    projects: profile.projects
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
