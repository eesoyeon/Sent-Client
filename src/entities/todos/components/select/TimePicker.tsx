const TimePicker = () => {
  return (
    <div>
      <div
        className="flex flex-col justify-start items-center w-[358px] relative gap-8 px-2 py-3 rounded-xl bg-black/0"
        style={{ boxShadow: "0px 4px 12px 0 rgba(0,0,0,0.1)" }}
      ></div>
      <div className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0">
        <div
          className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-12 relative gap-7 px-3 rounded-[999px]"
          style={{ filter: "drop-shadow(0px 4px 24px rgba(0,0,0,0.08))" }}
        >
          <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-center text-white">
            Reset
          </p>
        </div>
        <div
          className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-12 w-12 relative gap-2 rounded-[999px] bg-[#5199fd]"
          style={{ boxShadow: "0px 4px 24px 0 rgba(0,0,0,0.1)" }}
        >
          <p className="flex-grow-0 flex-shrink-0 text-[22px] font-medium text-center text-black">
            OK
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
