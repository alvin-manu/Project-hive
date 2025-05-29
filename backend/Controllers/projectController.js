
// add Project
const projects = require("../Models/projectSchema")

exports.addProject = async (req, res) => {

    const userId = req.payload
    console.log("userId", userId)
    const projectImage = req.file.filename
    const { title, language, githubLink, websiteLink, overView } = req.body
    try {
        const existingProject = await projects.findOne({ github: githubLink })

        if (existingProject) {
            res.status(401).json({ message: "project already exist" })
        } else {
            const newProject = new projects({
                title: title,
                language: language,
                github: githubLink,
                website: websiteLink,
                overView: overView,
                projectImage: projectImage,
                userId: userId
            })
            await newProject.save()
            res.status(201).json({ message: `${title} added successfully` })
        }
    } catch (error) {
        res.status(500).json({ message: "Uncaught Error", error })
    }

}

// get home project
exports.getHomeProject = async (req, res) => {
    try {
        const homeProjects = await projects.find().limit(3);
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json({ message: "Request Failed" })
    }
}

// 

exports.getAllProject = async (req, res) => {
    try {
        const userSearchkey = req.query.search;
        console.log(userSearchkey);
        const query = {
            // language: {
            //             $regex: userSearchkey, $options: 'i'
            //             // 2nd to avoid case sensitivity
            //         }
            $or: [
                {
                    language: {
                        $regex: userSearchkey, $options: 'i'
                        // 2nd to avoid case sensitivity
                    }
                },
                {
                    title: {
                        $regex: userSearchkey, $options: 'i'
                    }
                }
            ]

        }
        const allProjects = await projects.find(query);
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(500).json({ message: "Request Failed" })
    }
}

exports.getUserProject = async (req, res) => {
    try {
        const userId = req.payload;
        const userProjects = await projects.find({ userId: userId })
        res.status(200).json(userProjects)

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.updateUserProject = async (req, res) => {
    const { id } = req.params
    const userId = req.payload;
    const { title,
        language,
        githubLink,
        websiteLink,
        overView,
        projectImage } = req.body;
    const uploadedImage = req.file ? req.file.filename : projectImage
    console.log(uploadedImage);
    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: id },{
            title: title,
                language: language,
                github: githubLink,
                website: websiteLink,
                overView: overView,
                projectImage: uploadedImage,
                userId: userId
        },{
            new:true
        })
        await updateProject.save();
        res.status(201).json({message:"Updated Successfully"})


    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

}

exports.deleteUserProject = async(req, res)=>{
    const id = req.params.id;
    try {
        const response = await projects.findByIdAndDelete(id)
        if(response){
            res.status(200).json({message:"Deleted Successfully"})
        }else{
            res.status(401).json({message:"Something Went Wrong"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}