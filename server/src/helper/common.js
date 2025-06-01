module.exports = {
  stringToSlug: (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  getNextId: async (Model, match = {}) => {
    try {
      const doc = await Model.findOne(match)
        .sort({ id: -1 })
        .select("id")
        .lean();

      if (!doc || !doc.id) {
        return 1;
      }

      const currentMaxId = parseInt(doc.id, 10);
      if (isNaN(currentMaxId)) {
        throw new Error("Found id is not a valid number");
      }

      return (currentMaxId + 1);
    } catch (error) {
      console.error("Error getting next id:", error);
      throw error;
    }
  }
};
