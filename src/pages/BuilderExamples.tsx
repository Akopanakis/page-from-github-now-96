import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BuilderExamples = () => {
  useEffect(() => {
    console.log("BuilderExamples component mounted successfully");
  }, []);

  const examples = [
    {
      title: "KostoPro Enhanced JSON",
      description:
        "Complete Builder.io content entry with all advanced features",
      status: "Ready",
      features: [
        "Dynamic Library Loader",
        "Professional Theme System",
        "Advanced Cost Management",
        "Scenario Analysis",
        "Revenue Forecasting",
        "Financial Models",
        "Export Capabilities",
      ],
    },
    {
      title: "Component Library",
      description: "Reusable UI components for seafood costing applications",
      status: "Available",
      features: [
        "Cost Input Components",
        "Chart Visualizations",
        "Data Tables",
        "Modal Dialogs",
        "Form Validation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Builder.io Examples
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready-to-use Builder.io content entries and components for the
            KostoPro application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {examples.map((example, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{example.title}</CardTitle>
                  <Badge variant="secondary">{example.status}</Badge>
                </div>
                <p className="text-gray-600">{example.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-700">
                    Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {example.features.map((feature, featureIndex) => (
                      <Badge
                        key={featureIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Implementation Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                📁 Available Files:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • <code>builder-kostopro-enhanced.json</code> - Complete
                  Builder.io content entry
                </li>
                <li>
                  • Custom components in <code>/src/components/</code>
                </li>
                <li>
                  • Utility functions in <code>/src/utils/</code>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                🚀 Quick Start:
              </h3>
              <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                <li>Import the JSON file into Builder.io</li>
                <li>Configure your API keys and settings</li>
                <li>Preview and publish your content</li>
                <li>Integrate with your KostoPro application</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() =>
                  window.open("/builder-kostopro-enhanced.json", "_blank")
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                Download JSON
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                Back to App
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Route: /builder-examples • Status: ✅ Active</p>
        </div>
      </div>
    </div>
  );
};

export default BuilderExamples;
