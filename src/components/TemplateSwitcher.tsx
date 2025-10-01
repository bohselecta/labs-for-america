"use client";
import { useState, useEffect } from "react";
import { TEMPLATE_CONFIGS, TemplateKey } from "@/lib/template-configs";

export function TemplateSwitcher() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateKey>("civic");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleTemplateChange = async (template: TemplateKey) => {
    setCurrentTemplate(template);
    
    // Apply template configuration
    const config = TEMPLATE_CONFIGS[template];
    
    // Update page title
    document.title = `${config.name} - LabsForAmerica`;
    
    // Update favicon (if you have template-specific ones)
    // const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    // if (favicon) favicon.href = `/favicons/${template}.ico`;
    
    // Store current template in localStorage for persistence
    localStorage.setItem("dev-template", template);
    
    // Reload the page to apply changes
    window.location.reload();
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Template Preview</div>
      <div className="space-y-2">
        {Object.entries(TEMPLATE_CONFIGS).map(([key, config]) => (
          <button
            key={key}
            onClick={() => handleTemplateChange(key as TemplateKey)}
            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              currentTemplate === key
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            <div className="font-medium">{config.name}</div>
            <div className="text-xs text-gray-500">{config.orgName}</div>
          </button>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
        Development Mode Only
      </div>
    </div>
  );
}
