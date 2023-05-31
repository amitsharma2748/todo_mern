
const StaticLayout = (props: any) => {
  return (
    <div className=" relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-indigo-500 flex items-center justify-center z-[10] w-screen ">
        <h1 className="text-gray-50 inline-block text-5xl">Contact Page</h1>
      </div>
      <div className="absolute flex w-full h-full md:h-2/3 lg:h-full items-start justify-center top-[96px] ">

        <div className="w-5/6  h-5/6  flex justify-center">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default StaticLayout;
