"use client";

import { PiFloppyDisk } from "react-icons/pi";
import { DashboardButton, ResponsiveSheet } from "./primitives";
import { useSettingsModal } from "@/app/dashboard/hooks/useSettingsModal";
import { TestSettingsFields } from "./TestSettingsFields";

interface SettingsProps {
  testId: string;
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsModal = ({ testId, setShowSettingsModal }: SettingsProps) => {
  const close = () => setShowSettingsModal(false);
  const {
    settings,
    saving,
    loading,
    updateGeneralSetting,
    updateSecuritySetting,
    updateInvitees,
    updateTestTime,
    handleSubmit,
  } = useSettingsModal({
    testId,
    onClose: close,
  });

  return (
    <ResponsiveSheet
      title="Test Settings"
      onClose={close}
      className="md:max-w-[480px]"
      footer={
        loading ? null : (
          <DashboardButton type="submit" form="settings-form" disabled={saving} className="w-full">
            {saving ? (
              "Saving..."
            ) : (
              <>
                <PiFloppyDisk className="h-4 w-4" />
                Save Settings
              </>
            )}
          </DashboardButton>
        )
      }
    >
      {loading ? (
        <div className="flex min-h-64 items-center justify-center">
          <span className="loading loading-bars loading-xl" />
        </div>
      ) : (
        <TestSettingsFields
          settings={settings}
          updateGeneralSetting={updateGeneralSetting}
          updateSecuritySetting={updateSecuritySetting}
          updateInvitees={updateInvitees}
          updateTestTime={updateTestTime}
          onSubmit={handleSubmit}
        />
      )}
    </ResponsiveSheet>
  );
};

export default SettingsModal;
