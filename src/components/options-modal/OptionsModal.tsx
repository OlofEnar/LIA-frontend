import * as Dialog from '@radix-ui/react-dialog';
import styles from './OptionsModal.module.scss';
import { Settings, Settings2 } from 'lucide-react';

type OptionsModalProps = {
  isGlobal: boolean;
};

const OptionsModal = ({ isGlobal }: OptionsModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {isGlobal ? (
          <Settings size={22} strokeWidth={1.5} />
        ) : (
          <Settings2 size={22} strokeWidth={1.5} />
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>Options</Dialog.Title>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="btn btn-alt" aria-label="Close">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="btn btn-primary">Apply</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default OptionsModal;
