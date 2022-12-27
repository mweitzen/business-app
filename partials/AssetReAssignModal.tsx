import { useState } from "react";
import axios from "axios";
//
import ModalBase from "@/components/modal";
import SelectUser from "@/components/select-user";

const AssetReAssignModal = ({ asset }: { asset: any }) => {
  const [display, setDisplay] = useState(false);
  const [displayStep, setDisplayStep] = useState<number>(1);
  const [assetConfirmed, setAssetConfirmed] = useState(false);
  const [condition, setCondition] = useState<string>(asset.condition);
  const [conditionNotes, setConditionNotes] = useState<string>(
    asset.conditionNotes
  );
  const [user, setUser] = useState<{ id: string; name: string } | null>();

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
      <button
        className="mx-auto rounded-lg bg-green-300 p-4"
        onClick={handleClose}
      >
        Re-Assign
      </button>

      <ModalBase show={display} handleClose={() => setDisplay(false)}>
        {/* stage 1 | confirm asset */}
        {displayStep === 1 && !assetConfirmed ? (
          <div>
            <h3>Step 1 | Confirm Asset</h3>
            <p>Serial Number</p>
            <p>{asset.serialNumber}</p>
            <p>Currently Assigned To</p>
            <p>{asset.assignedTo.name}</p>
            <p>
              Before you assign this asset, confirm this is the correct serial
              number.
            </p>
            <button
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
            <p>Last Known Condition</p>
            <p>{condition}</p>
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
            <h3>Step 3 | Pick User</h3>
            <p>user dropdown</p>
            <SelectUser user={user} setUser={setUser} />
            <p>user quick details</p>
            <button
              className="mx-auto rounded-lg bg-green-300 p-4"
              onClick={async () => {
                const { data } = await axios.post(
                  `/api/assets/${asset.id}/reassign`,
                  {
                    userId: "clc5cwmxw00009kh89p6szob6",
                  }
                );
              }}
            >
              Re-Assign
            </button>
          </div>
        ) : null}
      </ModalBase>
    </div>
  );
};

export default AssetReAssignModal;
