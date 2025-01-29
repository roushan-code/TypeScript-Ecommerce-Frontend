
const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  )
}

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({width = "unset", length = 3}: SkeletonProps) => {
  Array.from({length}, (_,idx) => (
    <div key={idx} className="skeleton-snape"></div>
  ))
  return (
    <div className="skeleton-loader">
      <div className="skeleton-shape" style={{width}}></div>
      <div className="skeleton-shape"></div>
      <div className="skeleton-shape"></div>
    </div>
  )
}

export default Loader