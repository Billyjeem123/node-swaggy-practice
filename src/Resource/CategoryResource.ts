export class CategoryResource {
  static toJson(category) {
    return {
      type: "Categories",
      id: category._id,
      attributes: {
        name: category.name ?? '',
        created_at: new Date(category.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
      },
    };
  }

  static collection(categories) {
    return categories.map(category => this.toJson(category));
  }
}
