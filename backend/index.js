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





const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
