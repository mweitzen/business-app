import { useState } from "react";
import axios from "axios";
//
import ModalBase from "@/components/modal";
import SelectUser from "@/components/select-user";

const AssetAssignModal = ({ asset }: { asset: any }) => {
  const [display, setDisplay] = useState(false);
  const [displayStep, setDisplayStep] = useState<number>(1);
  const [assetConfirmed, setAssetConfirmed] = useState(false);
  const [condition, setCondition] = useState<string>(asset.condition);
  const [conditionNotes, setConditionNotes] = useState<string>(
    asset.conditionNotes
  );
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

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
        Assign
      </button>

      <ModalBase show={display} handleClose={() => setDisplay(false)}>
        {/* stage 1 | confirm asset */}
        {displayStep === 1 && !assetConfirmed ? (
          <div className="text-center">
            <h3 className="text-xl font-extralight">Step 1 | Confirm Asset</h3>
            <p>Serial Number</p>
            <p>{asset.serialNumber}</p>
            <p>
              Before you assign this asset, confirm this is the correct serial
              number.
            </p>
            <button
              className="mx-auto rounded-lg bg-green-300 p-4"
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
          <div className="text-center">
            <h3 className="text-xl font-extralight">
              Step 2 | Confirm Condition
            </h3>
            <p>Condition</p>
            <p>{condition}</p>
            <p>Condition Notes</p>
            <div>
              <textarea
                rows={3}
                className="resize-y rounded-lg border"
                value={conditionNotes}
                onChange={(e) => {
                  setConditionNotes(e.target.value);
                }}
              />
            </div>

            <button
              className="mx-auto rounded-lg bg-green-300 p-4"
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
          <div className="text-center">
            <h3 className="text-xl font-extralight">Step 3 | Pick User</h3>
            <p>user dropdown</p>
            <SelectUser />
            <p>user quick details</p>
            <button
              className="mx-auto rounded-lg bg-green-300 p-4"
              onClick={async () => {
                const { data } = await axios.post(
                  `/api/assets/${asset.id}/assign`,
                  {
                    userId: "clc5o1uoy00009ki0wcc7rd5a",
                  }
                );
              }}
            >
              Assign
            </button>
          </div>
        ) : null}
      </ModalBase>
    </div>
  );
};

export default AssetAssignModal;
