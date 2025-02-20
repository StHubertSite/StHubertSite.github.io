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
  const [DynamicComponent, setDynamicComponent] = useState<React.FC | null>(
    null
  );

  useEffect(() => {
    if (componentName) {
      const loadComponent = async () => {
        const { default: Component } = await import(`./pages/${componentName}`);
        setDynamicComponent(() => Component);
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
            <TransparentBackButton onClick={handleBack} text={"Back"} />
            {DynamicComponent && (
              <Suspense fallback={<div>Loading...</div>}>
                <DynamicComponent />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripedPage;
