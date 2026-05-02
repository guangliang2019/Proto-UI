import prompts from 'prompts';

import { listAdapterChoices } from '../registry/adapters.js';
import { listComponentChoices } from '../registry/components.js';

const cancelHandler = {
  onCancel: () => {
    throw new Error('command cancelled by user');
  },
};

export async function promptForStylesEnabled(defaultValue = true) {
  const response = await prompts(
    {
      type: 'confirm',
      name: 'enabled',
      message: 'Generate Proto UI style preset files now?',
      initial: defaultValue,
    },
    cancelHandler
  );
  return Boolean(response.enabled);
}

export async function promptForHost() {
  const response = await prompts(
    {
      type: 'select',
      name: 'host',
      message: 'Which host adapter should this component target?',
      choices: listAdapterChoices(),
      initial: 0,
    },
    cancelHandler
  );
  return response.host ?? null;
}

export async function promptForComponent() {
  const response = await prompts(
    {
      type: 'select',
      name: 'component',
      message: 'Which component should Proto UI add?',
      choices: listComponentChoices(),
      initial: 0,
    },
    cancelHandler
  );
  return response.component ?? null;
}
