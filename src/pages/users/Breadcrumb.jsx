import { Link } from 'react-router-dom';

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/user/lobby" className='text-white'>inicio /</Link>
          </li>
          <li className="text-blue-300">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
