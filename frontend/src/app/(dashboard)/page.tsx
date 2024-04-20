import EmptyPage from "./_components/EmptyPage"

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className="flex-1 bg-color-background h-[calc(100%-80px)] p-6">
      <EmptyPage />
    </div>
  )
}

export default Dashboard