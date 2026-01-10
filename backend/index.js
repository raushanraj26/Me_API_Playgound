const express = require("express");
const connectDB = require("./db");  //importing connectDB function from db.js
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
const Profile = require("./models/profile");  //importing Profile model from models/profile.js,this creates collections means table in mongodb
                                              //jisme humlog data store krnge,mongodb me plural name se create hoga ie Profiles

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


//crud operation for profile

//create profile
app.post("/profile", async (req, res) => {
  try {
    //only one profile is allowed,so check if profile already exist
    const existingProfile = await Profile.findOne();

    if (existingProfile) {
      return res.status(409).json({
        message: "Profile already exists"
      });
    }

    // creating document and saving to mongodb ,for easy understanding,creating  one row in table
    const profile = new Profile(req.body);
    await profile.save();

    res.status(201).json({
      message: "Profile created successfully",
      profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

//read profile
app.get("/profile", async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        message: "No profile found"
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
//update profile like add education,links,etc
app.put("/profile", async (req, res) => {
  try {
    
    const updatedProfile = await Profile.findOneAndUpdate(
      {},              
      req.body,        
      {
        new: true,     
        runValidators: true
      }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        message: "No profile to update"
      });
    }

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


//add project to profile
app.post("/projects", async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        message: "Create profile first"
      });
    }

    profile.projects.push(req.body);
    await profile.save();

    res.status(201).json({
      message: "Project added successfully",
      projects: profile.projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

//read projects from profile (only project)
app.get("/projects", async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.json([]);
    }

    res.json(profile.projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
//dearch project by title or description
app.get("/projects/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const profile = await Profile.findOne();

    if (!profile || !profile.projects) {
      return res.json([]);
    }

    const results = profile.projects.filter(project =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
    );

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

//delete project based on title
app.delete("/projects", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Project title is required"
      });
    }

    const profile = await Profile.findOne();

    if (!profile || !profile.projects) {
      return res.status(404).json({
        message: "No projects found"
      });
    }

    const initialLength = profile.projects.length;

    //keep all project expect the one to be deleted
    profile.projects = profile.projects.filter(
      project => project.title !== title
    );

    //if length is same means project is not found
    if (profile.projects.length === initialLength) {
      return res.status(404).json({
        message: "Project not found"
      });
    }
//save the updated profile
    await profile.save();

    res.json({
      message: "Project deleted successfully",
      projects: profile.projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

//----------------------------------skills crud-------------

//read skills
app.get("/skills", async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.json([]);
    }

    res.json(profile.skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
//add skill
app.post("/skills", async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({
        message: "Skill is required"
      });
    }

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        message: "Create profile first"
      });
    }

    if (profile.skills.includes(skill)) {
      return res.status(409).json({
        message: "Skill already exists"
      });
    }

    profile.skills.push(skill);
    await profile.save();

    res.status(201).json({
      message: "Skill added successfully",
      skills: profile.skills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
//delete skill
app.delete("/skills", async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({
        message: "Skill is required"
      });
    }

    const profile = await Profile.findOne();

    if (!profile || !profile.skills) {
      return res.status(404).json({
        message: "No skills found"
      });
    }

    const initialLength = profile.skills.length;

    profile.skills = profile.skills.filter(s => s !== skill);

    if (profile.skills.length === initialLength) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    await profile.save();

    res.json({
      message: "Skill deleted successfully",
      skills: profile.skills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

//read top skills(may be all) or top n skills
app.get("/skills/top", async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile || !profile.skills) {
      return res.json([]);
    }

    // read n from query, default = all skills
    const n = parseInt(req.query.n);

    if (!n || n <= 0) {
      return res.json(profile.skills);
    }

    const topSkills = profile.skills.slice(0, n);

    res.json(topSkills);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


connectDB(); //calling connectDB to connect to MOngodb

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

















//-------------------------------------------------Ignore below this line (for my understanding)-------------




// // In-memory storage
// let profile = null;
// //user data dega wahi profile me store hoga, so Post method use kr rhe
// //har bar data aayega profile data overwrite ho jaayega
// app.post("/profile", (req, res) => {
//   profile = req.body;
//   res.status(201).json({
//     message: "Profile stored in memory",
//     profile: profile
//   });
// });
// //ab jo data store hua hai use get(READ or retrieve) kaise karna hai,use GET method to see  what data is stored in memory
// app.get("/profile",(req,res)=>{
//   if(!profile){
//     return res.status(404).json({message:"No profile found inmemory"});
//   }
//   res.json(profile);
// });
// //ab jo existing profile data hai use me update means add or delete krna hai to use pUT method
// app.put("/profile", (req, res) => {
//   if (!profile) {
//     return res.status(404).json({
//       message: "No profile to update"
//     });
//   }

//   profile = {
//     ...profile,
//     ...req.body
//   };

//   res.json({
//     message: "Profile updated",
//     profile: profile
//   });
// });


//                   //ab humlog project ko add kr rhe and read (GET) kr rhe

// //humlog existing profile me project ko add kar rahe
// //We do not replace profile data,we just add project to existing profile data
// // app.post("/profile/projects",(req,res)=>{})
//   app.post("/projects", (req, res) => { 
//   if (!profile) {
//     return res.status(404).json({
//       message: "Create profile first"
//     });
//   }

//   if (!profile.projects) {
//     profile.projects = [];
//   }

//   const project = req.body;
//   profile.projects.push(project);

//   res.status(201).json({
//     message: "Project added",
//     projects: profile.projects
//   });
// });

// //get all projects from profile
// app.get("/projects", (req, res) => {
//   if (!profile || !profile.projects) {
//     return res.json([]);
//   }

//   res.json(profile.projects);
// });

// //search projects by title or description
// app.get("/projects/search", (req, res) => {
//   if (!profile || !profile.projects) {
//     return res.json([]);
//   }
//             // req.query.search reads the value of the query parameter named search from the URL.
//             // /projects/search?search=abc then express converts into req.query = { search: "abc" }
//             // so req.query.search === "abc"

//   const query = req.query.search;

//   if (!query) {
//     return res.status(400).json({
//       message: "Search query is required"
//     });
//   }

//   const results = profile.projects.filter(project =>
//     project.title.toLowerCase().includes(query.toLowerCase()) ||
//     project.description.toLowerCase().includes(query.toLowerCase())
//   );

//   res.json(results);
// });

// //delete project by title
// app.delete("/projects", (req, res) => {
//   if (!profile || !profile.projects) {
//     return res.status(404).json({
//       message: "No projects found"
//     });
//   }

//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({
//       message: "Project title is required"
//     });
//   }

//   const index = profile.projects.findIndex(
//     project => project.title === title
//   );

//   if (index === -1) {
//     return res.status(404).json({
//       message: "Project not found"
//     });
//   }

//   profile.projects.splice(index, 1);

//   res.json({
//     message: "Project deleted",
//     projects: profile.projects
//   });
// });


//                        //update and delete skills


// //app.get("profile/skills"(req,res))
// app.get("/skills", (req, res) => {
//   if (!profile || !profile.skills) {
//     return res.json([]);
//   }

//   res.json(profile.skills);
// });

// //add skill
// app.post("/skills", (req, res) => {
//   if (!profile) {
//     return res.status(404).json({
//       message: "Create profile first"
//     });
//   }

//   const { skill } = req.body;

//   if (!skill) {
//     return res.status(400).json({
//       message: "Skill is required"
//     });
//   }

//   if (!profile.skills) {
//     profile.skills = [];
//   }

//   if (profile.skills.includes(skill)) {
//     return res.status(409).json({
//       message: "Skill already exists"
//     });
//   }

//   profile.skills.push(skill);

//   res.status(201).json({
//     message: "Skill added",
//     skills: profile.skills
//   });
// });

// //delete skills,user give skill in the form of  body
// app.delete("/skills", (req, res) => {
//   if (!profile || !profile.skills) {
//     return res.status(404).json({
//       message: "No skills found"
//     });
//   }

//   const { skill } = req.body;

//   if (!skill) {
//     return res.status(400).json({
//       message: "Skill is required"
//     });
//   }

//   const index = profile.skills.indexOf(skill);

//   if (index === -1) {
//     return res.status(404).json({
//       message: "Skill not found"
//     });
//   }

//   profile.skills.splice(index, 1);

//   res.json({
//     message: "Skill deleted",
//     skills: profile.skills
//   });
// });
