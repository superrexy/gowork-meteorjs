import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { RecoilRoot } from 'recoil';
import 'react-loading-skeleton/dist/skeleton.css'

Meteor.startup(() => {
  render(<RecoilRoot><App/></RecoilRoot>, document.getElementById('react-target'));
});
