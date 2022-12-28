import React, { useState } from "react";
import axios from "axios";
//
import ModalBase from "@/components/modal";

const AssetUnAssignModal = ({ asset }: { asset: any }) => {
  const [display, setDisplay] = useState(false);
  const [displayStep, setDisplayStep] = useState<number>(1);
  const [assetConfirmed, setAssetConfirmed] = useState(false);
  const [condition, setCondition] = useState<string>(asset.condition);
  const [conditionNotes, setConditionNotes] = useState<string>(
    asset.conditionNotes
  );

  function handleClose() {
    setDisplay((prev) => !prev);
    setDisplayStep(1);
    setAssetConfirmed(false);
    setCondition("");
    setConditionNotes("");
  }

  return (
    <div>
      <button
        className="mx-auto rounded-full bg-element p-1.5 px-4 text-sm shadow shadow-purple-300"
        onClick={handleClose}
      >
        Un-Assign
      </button>

      <ModalBase show={display} handleClose={() => setDisplay(false)}>
        {/* stage 1 | confirm asset */}
        {displayStep === 1 && !assetConfirmed ? (
          <div>
            <h3>Step 1 | Confirm Asset</h3>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Serial Number
              </p>
              <p>{asset.serialNumber}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Currently Assigned To
              </p>
              <p>{asset.assignedTo.name}</p>
            </div>
            <p>
              Before you assign this asset, confirm this is the correct serial
              number.
            </p>
            <button
              className="mx-auto rounded-full bg-element p-1.5 px-4 text-sm shadow shadow-purple-300"
              onClick={() => {
                setAssetConfirmed(true);
                setDisplayStep(2);
              }}
            >
              Confirm
            </button>
          </div>
        ) : null}

        {/* stage 2 | confirm condition */}
        {displayStep === 2 ? (
          <div>
            <h3>Step 2 | Confirm Condition</h3>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Last Known Condition
              </p>
              <p>{condition}</p>
            </div>
            <p>Has the condition changed?</p>
            <p>Change condition</p>
            <p>Condition Notes</p>
            <textarea
              rows={3}
              className="resize-y"
              value={conditionNotes}
              onChange={(e) => {
                setConditionNotes(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setDisplayStep(3);
              }}
            >
              Confirm
            </button>
          </div>
        ) : null}

        {/* stage 3 | pick user */}
        {displayStep === 3 ? (
          <div>
            <h3>Step 3 | Confirm</h3>
            <p>Are you sure you want to unassign this asset?</p>
            <button
              className="mx-auto rounded-full bg-element p-1.5 px-4 text-sm shadow shadow-purple-300"
              onClick={async () => {
                const { data } = await axios.post(
                  `/api/assets/${asset.id}/unassign`
                );
              }}
            >
              Un-Assign
            </button>
          </div>
        ) : null}
      </ModalBase>
    </div>
  );
};

export default AssetUnAssignModal;
