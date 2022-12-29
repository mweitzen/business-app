import { useState } from "react";
import axios from "axios";
//
import ModalBase from "@/components/modal";
import SelectUser from "@/components/select-user";
import ButtonBase from "@/components/button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "pages/_app";

const AssetReAssignModal = ({ asset }: { asset: any }) => {
  const [display, setDisplay] = useState(false);
  const [displayStep, setDisplayStep] = useState<number>(1);
  const [assetConfirmed, setAssetConfirmed] = useState(false);
  const [condition, setCondition] = useState<string>(asset.condition);
  const [conditionNotes, setConditionNotes] = useState<string>(
    asset.conditionNotes
  );

  const [user, setUser] = useState<{ id: string; name: string } | null>();

  const mutation = useMutation({
    mutationFn: (data) =>
      axios.post(`/api/assets/${asset.id}/reassign`, {
        userId: "clc8d2h1g00009khehb7m79ts",
      }),
    onSuccess: (data) => {
      console.log("Successful mutation");
      queryClient.invalidateQueries({ queryKey: ["asset", asset.id] });
    },
  });

  function handleClose() {
    setDisplay((prev) => !prev);
    setDisplayStep(1);
    setAssetConfirmed(false);
    setCondition("");
    setConditionNotes("");
    setUser(null);
  }

  return (
    <div>
      <ButtonBase onClick={handleClose}>Re-Assign</ButtonBase>

      <ModalBase show={display} handleClose={() => setDisplay(false)}>
        {/* stage 1 | confirm asset */}
        {displayStep === 1 && !assetConfirmed ? (
          <div className="space-y-4 text-center">
            <h3>Step 1 | Confirm Asset</h3>
            <div className="rounded-lg border py-2 px-4">
              <p className="text-xs uppercase tracking-widest text-muted">
                Serial Number
              </p>
              <p>{asset.serialNumber}</p>
            </div>
            <div className="rounded-lg border py-2 px-4">
              <p className="text-xs uppercase tracking-widest text-muted">
                Currently Assigned To
              </p>
              <p>{asset.assignedTo.name}</p>
            </div>
            <p>
              Before you assign this asset, confirm this is the correct serial
              number.
            </p>
            <ButtonBase
              className="w-full"
              onClick={() => {
                setAssetConfirmed(true);
                setDisplayStep(2);
              }}
            >
              Confirm
            </ButtonBase>
          </div>
        ) : null}

        {/* stage 2 | confirm condition */}
        {displayStep === 2 ? (
          <div className="space-y-4 text-center">
            <h3>Step 2 | Confirm Condition</h3>
            <div className="rounded-lg border py-2 px-4">
              <p className="text-xs uppercase tracking-widest text-muted">
                Last Known Condition
              </p>
              <p>{asset.condition}</p>
            </div>
            <p>Has the condition changed?</p>
            <p>Change condition</p>
            <p>Condition Notes</p>
            <div>
              <textarea
                rows={3}
                className="resize-y"
                value={conditionNotes}
                onChange={(e) => {
                  setConditionNotes(e.target.value);
                }}
              />
            </div>
            <ButtonBase
              className="w-full"
              onClick={() => {
                setDisplayStep(3);
              }}
            >
              Confirm
            </ButtonBase>
          </div>
        ) : null}

        {/* stage 3 | pick user */}
        {displayStep === 3 ? (
          <div className="space-y-4 text-center">
            <h3>Step 3 | Pick User</h3>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                user dropdown
              </p>
              <SelectUser />
            </div>
            <div className="rounded-lg border py-2 px-4">
              <p className="text-xs uppercase tracking-widest text-muted">
                user quick details
              </p>
            </div>
            <ButtonBase
              className="w-full"
              onClick={() => {
                mutation.mutate();
                handleClose();
              }}
            >
              Re-Assign
            </ButtonBase>
          </div>
        ) : null}
      </ModalBase>
    </div>
  );
};

export default AssetReAssignModal;
