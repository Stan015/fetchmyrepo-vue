<template>
  <footer
    className="flex flex-col w-full h-[11rem] items-center self-end justify-center gap-6 mt-4 border-[1px] border-t-slate-800 p-2"
  >
    <!-- <div className="flex w-full gap-6 text-[0.7rem] justify-center"> -->
    <!-- <Link
          className="bg-primary p-2 text-center hover:bg-violet-800 transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 cursor-pointer rounded-sm w-[8rem]"
          onClick="{testErrorBoundary}"
        >
          Test Error Boundary
        </Link> -->
    <!-- <Link
            className="bg-primary p-2 text-center hover:bg-violet-800transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:border-violet-700 cursor-pointer rounded-sm w-[8rem]"
            to={"/notfound"}
          >
            Test 404 page
          </Link> -->
    <!-- </div> -->
    <div className="flex w-full justify-around">
      <p className="text-center max-sm:w-1/2 max-sm:text-sm">
        "Everyone's got a blank page and a pen 🖊️"
      </p>
      <span className="text-center max-sm:w-1/2 max-sm:text-sm">
        &copy;{{ ` Stanley Azi ${new Date().getFullYear()}` }}
      </span>
    </div>
  </footer>
</template>
