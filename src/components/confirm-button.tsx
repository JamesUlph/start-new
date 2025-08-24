'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { LucideLoader2 } from 'lucide-react';
import { useState } from 'react';

export function ConfirmButton({
  type,
  confirmText = 'Confirm',
  variant = 'default',

  dialog,

  isBusy = false,

  onConfirm,
  onCancel,
  children,
  ...props
}: {
  type?: string;

  dialog?: { title?: string; description?: string };
  isBusy?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'link'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | null
    | undefined;

  confirmText?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
}) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <Button
        type="button"
        disabled={isBusy}
        {...props}
        onClick={() => {
          setShowDialog(true);
        }}
      >
        {isBusy ? (
          <span className="min-w-30 items-center justify-center flex">
            <LucideLoader2 className="animate-spin" />
          </span>
        ) : (
          <>
            {children} {type}
          </>
        )}
        {/* {children} {type} */}
      </Button>
      <Dialog
        open={showDialog}
        onOpenChange={(v) => {
          if (v == false) {
            setShowDialog(v);
            onCancel && onCancel();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialog?.title}</DialogTitle>
            <DialogDescription>{dialog?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={'secondary'}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="button"
              variant={variant}
              onClick={() => {
                setShowDialog(false);
                onConfirm && onConfirm();
              }}
            >
              {confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
