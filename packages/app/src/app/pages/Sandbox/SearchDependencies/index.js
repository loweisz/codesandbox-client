import React from 'react';
import { InstantSearch, Configure, PoweredBy } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';

import Style from 'app/pages/Search/search';
import DependenciesCSS from './dependencies';

import RawAutoComplete from './RawAutoComplete';

const ConnectedAutoComplete = connectAutoComplete(RawAutoComplete);

export default class SearchDependencies extends React.PureComponent {
  hitToVersionMap = new Map();
  packages = [];

  handleSelect = hit => {
    let version = this.hitToVersionMap.get(hit);

    if (!version && hit.tags) {
      version = hit.tags.latest;
    }

    this.props.onConfirm([...this.packages, { name: hit.name, version }]);
  };

  handleManualSelect = hitName => {
    if (!hitName) {
      return;
    }

    const isScoped = hitName.startsWith('@');
    let version = 'latest';

    const splittedName = hitName.split('@');

    if (splittedName.length > (isScoped ? 2 : 1)) {
      version = splittedName.pop();
    }

    const depName = splittedName.join('@');
    this.packages.push({ name: depName, version });
  };

  handleHitVersionChange = (hit, version) => {
    this.hitToVersionMap.set(hit, version);
  };

  onConfirm = packages => {
    packages.forEach(pack => {
      this.handleManualSelect(pack);
    });
    this.props.onConfirm(this.packages);
    this.packages = [];
  };

  render() {
    return (
      <div className="search-dependencies">
        <Style />
        <DependenciesCSS />
        <InstantSearch
          appId="OFCNCOG2CU"
          apiKey="00383ecd8441ead30b1b0ff981c426f5"
          indexName="npm-search"
        >
          <Configure
            analyticsTags={['codesandbox-dependencies']}
            hitsPerPage={5}
          />
          <ConnectedAutoComplete
            onConfirm={this.onConfirm}
            onSelect={this.handleSelect}
            onHitVersionChange={this.handleHitVersionChange}
          />
          <footer>
            <PoweredBy />
          </footer>
        </InstantSearch>
      </div>
    );
  }
}
