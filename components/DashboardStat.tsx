import React from 'react'

interface DashboardStatProps {
    title: string
    figure: number
    isLoading?: boolean
    Icon: React.ElementType
}

const DashboardStat = ({Icon, isLoading, title, figure}:DashboardStatProps ) => {
  return (
    <div className=" px-5.25 py-6.75 bg-white rounded-[16px]">
            <div className="flex items-center gap-3">
              <Icon className="size-6 text-primary" />
              <p className="leading-5.5 text-neutral-500">{title}</p>
            </div>

            <p
              className={` ${
                isLoading && "animate-pulse duration-300"
              } mt-5 text-xl font-semibold leading-7`}
            >
              {figure.toLocaleString()}
            </p>
          </div>
  )
}

export default DashboardStat