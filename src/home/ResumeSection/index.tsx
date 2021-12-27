import {
  Block,
  Container,
  ContentColumns,
  Section,
  Title,
  TitleColumn,
  Text,
  LinksContainer,
} from './styles';
import ArrowLink from '$/common/components/ArrowLink';

import sections from './data';

export default function ResumeSection() {
  return (
    <Container>
      {sections.map(({ title, content }) => (
        <Section key={title}>
          <TitleColumn>
            <Title>{title}</Title>
          </TitleColumn>
          <ContentColumns>
            {content.map((item, idx) => (
              <Block key={`${title}-${idx}`}>
                {item.description ? <Text>{item.description}</Text> : null}
                {item.links ? (
                  <LinksContainer>
                    {item?.links?.map(({ label, link }) => (
                      <ArrowLink
                        key={link}
                        label={label}
                        link={link}
                        target="_blank"
                      />
                    ))}
                  </LinksContainer>
                ) : null}
              </Block>
            ))}
          </ContentColumns>
        </Section>
      ))}
    </Container>
  );
}
