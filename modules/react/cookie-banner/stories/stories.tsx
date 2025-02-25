/// <reference path="../../../../typings.d.ts" />
/** @jsx jsx */
import {jsx} from '@emotion/core';
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import {action} from '@storybook/addon-actions';
import styled from '@emotion/styled';

import {Hyperlink, SecondaryButton} from '../../button';
import DeprecatedCookieBanner from '../index';
import README from '../README.md';

interface Props {
  bannerProps?: any;
}

interface State {
  acceptedCookies: boolean;
}

const Container = styled('div')({
  height: '110vh', // So we can scroll
});

class BannerContainer extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      acceptedCookies: false,
    };
  }

  private onAccept = (e: React.MouseEvent<HTMLButtonElement>): void => {
    action('accept-cookies')(e);
    this.setState({
      acceptedCookies: true,
    });
  };

  private reset = (): void => {
    this.setState({
      acceptedCookies: false,
    });
  };

  public render() {
    const {bannerProps} = this.props;

    return (
      <Container>
        <SecondaryButton onClick={this.reset}>Reset Banner</SecondaryButton>
        <DeprecatedCookieBanner
          onAccept={this.onAccept}
          isClosed={this.state.acceptedCookies}
          {...bannerProps}
        />
      </Container>
    );
  }
}

storiesOf('Components/Indicators/Cookie Banner/React', module)
  .addParameters({component: DeprecatedCookieBanner})
  .addDecorator(withReadme(README))
  .add('Default', () => (
    <div className="story">
      <BannerContainer
        bannerProps={{
          onClickSettings: action('click-settings'),
        }}
      />
    </div>
  ))
  .add('With Custom Notice', () => (
    <div className="story">
      <BannerContainer
        bannerProps={{
          onClickSettings: action('click-settings'),
          notice: (
            <React.Fragment>
              {DeprecatedCookieBanner.DefaultNotice} Please review our{' '}
              <Hyperlink href="https://www.workday.com/en-us/privacy.html" target="__blank">
                Privacy Policy
              </Hyperlink>
              .
            </React.Fragment>
          ),
        }}
      />
    </div>
  ))
  .add('With No Settings', () => (
    <div className="story">
      <BannerContainer />
    </div>
  ));
