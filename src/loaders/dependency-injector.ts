import Container from 'typedi';
import mailgun from 'mailgun-js';

import config from '@src/config';
import LoggerInstance from './logger';

export default ({ repositories }: { repositories: { name: string; repository: any }[] }) => {
  try {
    repositories.forEach(async repo => {
      Container.set(repo.name, repo.repository);
    });

    Container.set('logger', LoggerInstance);
    Container.set(
      'emailClient',
      mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }),
    );
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
