import { poppins } from '@/app/fonts'
import PageLayoutProps from '@/components/server/page-layout/type'

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={poppins.className}>
      <div className="page-layout-header">
      </div>
      <div className="page-layout-container">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default PageLayout
