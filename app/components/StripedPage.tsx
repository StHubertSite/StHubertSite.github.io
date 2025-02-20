import React, { useEffect, useState, Suspense } from "react";
import TransparentBackButton from "./TransparentBackButton";

interface StripedPageProps {
  handleBack: () => void;
  componentName: string;
}

const StripedPage: React.FC<StripedPageProps> = ({
  handleBack,
  componentName,
}) => {
  interface DynamicComponentProps {
    handleBack: () => void;
  }

  const [DynamicComponent, setDynamicComponent] =
    useState<React.FC<DynamicComponentProps> | null>(null);

  useEffect(() => {
    if (componentName) {
      const loadComponent = async () => {
        try {
          const { default: Component } = await import(
            `./pages/${componentName}`
          );
          setDynamicComponent(() => Component);
        } catch {
          setDynamicComponent(() => null);
        }
      };
      loadComponent();
    }
  }, [componentName]);

  return (
    <div className="striped-page-container">
      <div className="striped-page-wrapper">
        <div className="striped-page">
          {" "}
          <div>
            {DynamicComponent ? (
              <Suspense fallback={<div>Loading...</div>}>
                <DynamicComponent handleBack={handleBack} />
              </Suspense>
            ) : (
              <TransparentBackButton onClick={handleBack} text={"Back"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripedPage;
