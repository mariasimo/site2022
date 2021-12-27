import { fetchGraphQL } from '.';
import type { Document } from '@contentful/rich-text-types';

const LEARNING_IN_PUBLIC_GRAPHQL_FIELDS = `
    current {
      json
    }
    next {
      json
    }
`;

type RawLearningInPublicCollection = {
  data: { learningInPublicCollection: { items: RawLearningInPublicNode[] } };
};

type RawLearningInPublicNode = {
  current?: { json: Document };
  next?: { json: Document };
};

export async function getLearningInPublicNode(preview: boolean) {
  const entries = (await fetchGraphQL(
    `query {
        learningInPublicCollection(preview: ${preview ? 'true' : 'false'}) {
            items {
            ${LEARNING_IN_PUBLIC_GRAPHQL_FIELDS}
            }
        }
        }`,
    preview,
  )) as RawLearningInPublicCollection;

  return extractLearningInPublicNode(entries);
}

function extractLearningInPublicNode(
  fetchResponse: RawLearningInPublicCollection,
) {
  const {
    items: [item],
  } = fetchResponse?.data.learningInPublicCollection;
  return normalizeLearningInPublicNode(item);
}

function normalizeLearningInPublicNode(item: RawLearningInPublicNode) {
  return {
    current: item.current?.json,
    next: item.next?.json,
  };
}

export type LearningInPublicNode = ReturnType<
  typeof normalizeLearningInPublicNode
>;
