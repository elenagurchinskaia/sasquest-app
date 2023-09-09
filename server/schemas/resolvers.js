const { User, Project } = require("../models");

const resolvers = {
  Query: {
    //----- Get All Wireframes -----//
    wireframe: async () => {
      try {
        const wireframe = await Project.find({});
        return wireframe;
      } catch (error) {
        throw new Error(`Error getting wireframe: ${error.message}`);
      }
    },
    //----- Get One Wireframe -----//
    wireframeId: async (parent, { _id }) => {
      try {
        const wireframe = await Project.findOne({ _id });
        if (!wireframe) {
          throw new Error(`Wireframe not found`);
        }
        return wireframe;
      } catch (error) {
        throw new Error(`Error getting wireframe: ${error.message}`);
      }
    },

    //----- Get All Projects -----//
    projects: async () => {
      try {
        const projects = await Project.find({});
        return projects;
      } catch (error) {
        throw new Error(`Error getting projects: ${error.message}`);
      }
    },

    //----- Get One Project -----//
    project: async (parent, { projectId }) => {
      try {
        const project = await Project.findOne({ _id: projectId });
        if (!project) {
          throw new Error(`Project not found`);
        }
        return project;
      } catch (error) {
        throw new Error(`Error getting project: ${error.message}`);
      }
    },
  },

  Mutation: {
    createWireframe: async (parent, args) => {
      try {
        const wireframe = await Project.create(args);
        return wireframe;
      } catch (error) {
        throw new Error(`Error creating wireframe: ${error.message}`);
      }
    },
    updateWireframe: async (parent, { _id, ...args }) => {
      try {
        const wireframe = await Project.findByIdAndUpdate(_id, args, {
          new: true,
        });
        return wireframe;
      } catch (error) {
        throw new Error(`Error updating wireframe: ${error.message}`);
      }
    },
    deleteWireframe: async (parent, { _id }) => {
      try {
        const wireframe = await Project.findByIdAndDelete(_id);
        return wireframe;
      } catch (error) {
        throw new Error(`Error deleting wireframe: ${error.message}`);
      }
    },

    //----- Add Project Info -----//
    addInfo: async (
      parent,
      { projectId, repoURL, deployedURL, description }
    ) => {
      try {
        const updatedProject = await Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: { info: { repoURL, deployedURL, description } },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedProject) {
          throw new Error("Project not found");
        }

        return updatedProject;
      } catch (error) {
        throw new Error(`Error adding project info: ${error.message}`);
      }
    },

    //----- Update Project Info -----//
    updateInfo: async (parent, { projectId, infoId, updatedInfo }) => {
      try {
        const project = await Project.findById(projectId);

        if (!project) {
          throw new Error("Project not found");
        }

        const infoToUpdate = project.info.find((info) => info._id == infoId);

        if (!infoToUpdate) {
          throw new Error("Project info not found");
        }

        if (updatedInfo.repoURL !== undefined) {
          infoToUpdate.repoURL = updatedInfo.repoURL;
        }
        if (updatedInfo.deployedURL !== undefined) {
          infoToUpdate.deployedURL = updatedInfo.deployedURL;
        }
        if (updatedInfo.description !== undefined) {
          infoToUpdate.description = updatedInfo.description;
        }

        await project.save();

        return project;
      } catch (error) {
        throw new Error(`Error updating project info: ${error.message}`);
      }
    },
  },

  //----- Add Project -----//

  addProject: async (parent, { title, projectId }) => {
    try {
      const updatedProject = await Project.create(
        { _id: projectId },
        { $addToSet: { projects: { title } } },
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return updatedProject;
    } catch (error) {
      throw new Error(`Error adding project: ${error.message}`);
    }
  },

  //----- Update Project -----//

  updateProject: async (parent, { projectId, project }) => {
    try {
      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $set: { projects: project } },
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return updatedProject;
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`);
    }
  },

  //----- Remove Project -----//

  removeProject: async (parent, { projectId, project }) => {
    try {
      const updatedProject = await Project.findOneAndDelete(
        { _id: projectId },
        { $pull: { projects: project } },
        { new: true }
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return updatedProject;
    } catch (error) {
      throw new Error(`Error removing project: ${error.message}`);
    }
  },

  //----- Remove Project Info -----//
  removeInfo: async (parent, { projectId, infoId }) => {
    try {
      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $pull: { info: { _id: infoId } } },
        { new: true }
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return updatedProject;
    } catch (error) {
      throw new Error(`Error removing project info: ${error.message}`);
    }
  },
};

module.exports = resolvers;
