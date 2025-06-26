module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:8080/",
        "http://localhost:8080/about",
        "http://localhost:8080/projects"
      ],
      startServerCommand: "npm run dev",
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:performance": ["error", { minScore: 0.9 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
