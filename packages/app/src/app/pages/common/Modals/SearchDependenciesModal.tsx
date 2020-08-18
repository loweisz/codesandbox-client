import React, { FunctionComponent } from 'react';

import { useOvermind } from 'app/overmind';
import SearchDependencies from 'app/pages/Sandbox/SearchDependencies';

export const SearchDependenciesModal: FunctionComponent = () => {
  const {
    actions: {
      editor: { addNpmDependency },
    },
  } = useOvermind();

  const onConfirm = packages => {
    packages.forEach(pack => addNpmDependency(pack));
  };

  return <SearchDependencies onConfirm={onConfirm} />;
};
