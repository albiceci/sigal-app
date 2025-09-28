import { Button } from "../../../ui/button/button";

export function ProfilePicture() {
  return (
    <div className="lg:w-[180px] xl:w-[220px]">
      <div className="font-semibold text-lg text-presetgray">Foto profili</div>
      <div className="flex flex-col gap-5 items-center justify-center py-7 lg:py-7 xl:py-10">
        <div>
          <img
            src={require("./../../../../assets/freepik/account/accountUserPic.png")}
            className="h-36 w-36 lg:h-32 lg:w-32 xl:h-36 xl:w-36 min-w-16 min-h-16"
            alt=""
          />
        </div>
        <div>
          <Button
            buttonType="secondary"
            padding="px-10 py-2"
            //disabled={!(isValid && isChanged)}
            onClick={() => {
              //
            }}
          >
            Shto foto
          </Button>
        </div>
      </div>
    </div>
  );
}
