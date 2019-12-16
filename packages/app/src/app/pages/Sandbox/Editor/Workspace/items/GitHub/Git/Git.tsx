import Margin from '@codesandbox/common/lib/components/spacing/Margin';
import { Button } from '@codesandbox/common/lib/components/Button';
import GithubBadge from '@codesandbox/common/lib/components/GithubBadge';
import Input, { TextArea } from '@codesandbox/common/lib/components/Input';
import { githubRepoUrl } from '@codesandbox/common/lib/utils/url-generator';
import React, { ChangeEvent, FunctionComponent, useEffect } from 'react';

import { useOvermind } from 'app/overmind';

import { WorkspaceInputContainer, WorkspaceSubtitle } from '../../../elements';

import { Container, Buttons, ErrorMessage, NoChanges } from './elements';
import { TotalChanges } from './TotalChanges';

const hasWriteAccess = (rights: string) => ['admin', 'write'].includes(rights);

export const Git: FunctionComponent = () => {
  const {
    actions: {
      git: {
        createCommitClicked,
        createPrClicked,
        descriptionChanged,
        gitMounted,
        subjectChanged,
      },
    },
    state: {
      editor: {
        currentSandbox: { originalGit },
        isAllModulesSynced,
      },
      git: { description, isFetching, originalGitChanges: gitChanges, subject },
    },
  } = useOvermind();

  useEffect(() => {
    gitMounted();
  }, [gitMounted]);

  const createCommit = () => createCommitClicked();
  const createPR = () => createPrClicked();
  const changeSubject = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => subjectChanged({ subject: value });
  const changeDescription = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) =>
    descriptionChanged({ description: value });

  const modulesNotSaved = !isAllModulesSynced;
  const changeCount = gitChanges
    ? gitChanges.added.length +
      gitChanges.modified.length +
      gitChanges.deleted.length
    : 0;

  return (
    <Container>
      <WorkspaceSubtitle>GitHub Repository</WorkspaceSubtitle>

      <Margin margin={1}>
        <GithubBadge
          branch={originalGit.branch}
          repo={originalGit.repo}
          url={githubRepoUrl(originalGit)}
          username={originalGit.username}
          commitSha={originalGit.commitSha}
        />
      </Margin>

      <Margin bottom={0}>
        <WorkspaceSubtitle>
          Changes ({isFetching ? '...' : changeCount})
        </WorkspaceSubtitle>

        {!isFetching ? (
          <Margin top={1}>
            <TotalChanges gitChanges={gitChanges || {}} />

            {changeCount > 0 ? (
              <Margin top={1}>
                <WorkspaceSubtitle>Commit Info</WorkspaceSubtitle>
                {modulesNotSaved && (
                  <ErrorMessage>
                    You need to save all modules before you can commit
                  </ErrorMessage>
                )}

                <WorkspaceSubtitle
                  style={{
                    color: subject.length > 72 ? `#F27777` : `#556362`,
                    textAlign: 'right',
                  }}
                >
                  {`${subject.length}/72`}
                </WorkspaceSubtitle>

                <WorkspaceInputContainer>
                  <Input
                    block
                    onChange={changeSubject}
                    placeholder="Subject"
                    value={subject}
                  />
                </WorkspaceInputContainer>

                <WorkspaceInputContainer>
                  <TextArea
                    block
                    onChange={changeDescription}
                    placeholder="Description"
                    value={description}
                  />
                </WorkspaceInputContainer>

                <Buttons>
                  {hasWriteAccess(gitChanges.rights) && (
                    <Button
                      block
                      disabled={!subject || modulesNotSaved}
                      onClick={createCommit}
                      small
                    >
                      Commit
                    </Button>
                  )}

                  <Button
                    block
                    disabled={!subject || modulesNotSaved}
                    onClick={createPR}
                    small
                  >
                    Open PR
                  </Button>
                </Buttons>
              </Margin>
            ) : (
              <Margin bottom={1} horizontal={1}>
                <NoChanges>There are no changes</NoChanges>
              </Margin>
            )}
          </Margin>
        ) : (
          <Margin margin={1}>
            <div>Fetching changes...</div>
          </Margin>
        )}
      </Margin>
    </Container>
  );
};
