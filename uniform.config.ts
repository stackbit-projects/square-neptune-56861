// this file is loaded in /pages/index.js

import { UniformContextProps, } from "@uniformdev/common-client";
import { getDefaultProcessingInstructions } from "@uniformdev/next";

export default function(): UniformContextProps {  
  return {
    options: {
      // custom mvc configuration
      mvc: {
        getProcessingInstructions: (processDefaultNode: any, placeholderComponent, r, index, placeholderKey, renderingContext, logger) => [
          ...getDefaultProcessingInstructions(processDefaultNode, placeholderComponent, r, index, placeholderKey, renderingContext, logger)
        ]
      }
    }
  };
}
