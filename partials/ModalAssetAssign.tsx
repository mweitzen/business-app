import { useState } from "react";
import { api } from "@/lib/api";
import { queryClient } from "pages/_app";
//
import ModalBase from "@/components/modal";
import SelectUser from "@/components/select-user";
import ButtonBase from "@/components/button";
import LabelText from "@/components/text-label";

//
const MOCK_USER_ID = "clcgvbd0900009kykktt3jut7";

/*
 *
 * ASSIGN ASSET TO USER MODAL
 *
 */
const AssetAssignModal = ({ asset }: { asset: any }) => {
  const [display, setDisplay] = useState(false);
  const [displayStep, setDisplayStep] = useState<number>(1);
  const [assetConfirmed, setAssetConfirmed] = useState(false);
  const [condition, setCondition] = useState<string>(asset.condition);
  const [conditionNotes, setConditionNotes] = useState<string>(
    asset.conditionNotes
  );
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const mutation = api.asset.assignToUser.useMutation();
  //   onSuccess: () => {
  //     console.log("Successful mutation");
  //     queryClient.invalidateQueries({ queryKey: ["asset", asset.id] });
  //   },
  // });

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
      <ButtonBase className="w-full" onClick={handleClose}>
        Assign
      </ButtonBase>

      <ModalBase show={display} handleClose={() => setDisplay(false)}>
        {/* stage 1 | confirm asset */}
        {displayStep === 1 && !assetConfirmed ? (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-extralight">Step 1 | Confirm Asset</h3>
            <div className="rounded-lg border py-2 px-4">
              <LabelText>Serial Number</LabelText>
              <p>{asset.serialNumber}</p>
            </div>
            <p className="text-sm font-light">
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
            <h3 className="text-xl font-extralight">
              Step 2 | Confirm Condition
            </h3>
            <div className="rounded-lg border py-2 px-4">
              <LabelText>Condition</LabelText>
              <p className="capitalize">
                {asset.condition.toLowerCase().replace("_", " ")}
              </p>
            </div>
            <div className="rounded-lg border py-2 px-4">
              <LabelText>Condition Notes</LabelText>
              <div>
                <textarea
                  rows={3}
                  className="w-full resize-y rounded-lg border-gray-100"
                  value={conditionNotes}
                  onChange={(e) => {
                    setConditionNotes(e.target.value);
                  }}
                />
              </div>
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
            <h3 className="text-xl font-extralight">Step 3 | Assign to User</h3>
            <div>
              <LabelText>Select an employee (optional)</LabelText>
              <SelectUser />
            </div>

            {/* <div className="rounded-lg border py-2 px-4">
              <LabelText>User quick details</LabelText>
            </div> */}

            <ButtonBase
              className="w-full"
              onClick={async () => {
                mutation.mutate({
                  userId: MOCK_USER_ID,
                  assetId: asset.id,
                });
                handleClose();
              }}
            >
              Assign
            </ButtonBase>
          </div>
        ) : null}
      </ModalBase>
    </div>
  );
};

export default AssetAssignModal;
