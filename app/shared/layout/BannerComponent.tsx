import React, { useState } from 'react'
import {
  FLAG_IMG_URL,
  DOT_GOV_ICON_URL,
  HTTPS_ICON_URL
} from '../../constants/image';
import {
  Banner,
  BannerHeader,
  BannerFlag,
  BannerButton,
  BannerContent,
  BannerGuidance,
  BannerIcon,
  MediaBlockBody,
  Icon

} from '@trussworks/react-uswds';

export default function BannerComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Banner
        aria-label="Official website of the state department of something specific"
      >
        <BannerHeader
          isOpen={isOpen}
          flagImg={<BannerFlag src={FLAG_IMG_URL} aria-hidden alt="" />}
          headerText="This is an official website of the state department of something specific"
          headerActionText="Here's how you know"
        >
          <BannerButton
            isOpen={isOpen}
            aria-controls="custom-banner"
            onClick={(): void => {
              setIsOpen(previousIsOpen => !previousIsOpen);
            }}
          >
                        Here&apos;s how you know
          </BannerButton>
          <BannerContent id="custom-banner" isOpen={isOpen}>
            <div className="grid-row grid-gap-lg">
              <BannerGuidance className="tablet:grid-col-6">
                <BannerIcon src={DOT_GOV_ICON_URL} alt="" />
                <MediaBlockBody>
                  <p>
                    <strong>Official websites use .gov</strong>
                    <br />A <strong>.gov</strong> website belongs to an official
                                government organization in the United States.
                  </p>
                </MediaBlockBody>
              </BannerGuidance>
              <BannerGuidance className="tablet:grid-col-6">
                <BannerIcon src={HTTPS_ICON_URL} alt="" />
                <MediaBlockBody>
                  <p>
                    <strong>Secure .gov websites use HTTPS</strong>
                    <br />A{' '}
                    <strong>
                                lock (<Icon.Lock aria-label="Locked padlock icon" />)
                    </strong>{' '}
                                or <strong>https://</strong> means you&apos;ve safely connected
                                to the .gov website. Share sensitive information only on
                                official, secure websites.
                  </p>
                </MediaBlockBody>
              </BannerGuidance>
            </div>
          </BannerContent>
        </BannerHeader>
      </Banner>
    </div>
  )
}
