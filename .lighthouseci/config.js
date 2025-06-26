module.exports = {
  ci: {
    collect: {
      url: [
        "https://kostopro.vercel.app/",
        "https://kostopro.vercel.app/about",
        "https://kostopro.vercel.app/projects"
      ],
      startServerCommand: "npm run dev",
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:performance": ["warn", { minScore: 0.9 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
