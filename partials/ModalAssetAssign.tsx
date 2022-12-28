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
        className="mx-auto rounded-full bg-element p-1.5 px-4 text-sm shadow shadow-purple-300"
        onClick={handleClose}
      >
        Assign
      </button>

      <ModalBase show={display} handleClose={() => setDisplay(false)}>
        {/* stage 1 | confirm asset */}
        {displayStep === 1 && !assetConfirmed ? (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-extralight">Step 1 | Confirm Asset</h3>
            <div className="rounded-lg border py-2 px-4">
              <p className="text-xs uppercase tracking-widest text-muted">
                Serial Number
              </p>
              <p>{asset.serialNumber}</p>
            </div>
            <p className="text-sm">
              Before you assign this asset, confirm this is the correct serial
              number.
            </p>
            <button
              className="w-full rounded-full bg-element p-1.5 px-4 text-sm shadow shadow-purple-300"
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
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-extralight">
              Step 2 | Confirm Condition
            </h3>
            <div className="rounded-lg border py-2 px-4">
              <p className="text-xs uppercase tracking-widest text-muted">
                Condition
              </p>
              <p>{condition}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Condition Notes
              </p>
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
            </div>

            <button
              className="w-full rounded-full bg-element p-1.5 px-4 text-sm shadow shadow-purple-300"
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
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-extralight">Step 3 | Pick User</h3>
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
            <button
              className="w-full rounded-full bg-element p-1.5 px-4 text-sm shadow shadow-purple-300"
              onClick={async () => {
                const { data } = await axios.post(
                  `/api/assets/${asset.id}/assign`,
                  {
                    userId: "clc6xm1vg00009kv3r7jtaeu3",
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
