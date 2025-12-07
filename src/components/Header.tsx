import {
  Link,
  useNavigate,
  useParams,
  useRouter,
  useSearch,
} from '@tanstack/react-router';
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectGroup,
} from './ui/select';
import { Route } from '@/routes';

const jobs = [
  2000000, 2000100, 2007167, 2023490, 2023478, 2023487, 2023480, 2023549,
  2023602,
];
export default function Header() {
  let r = useNavigate();
  const { caseNumber } = useSearch({ from: '/case', shouldThrow: false }) || {
    caseNumber: undefined,
  };

  return (
    <header className="p-2 flex gap-2 bg-indigo-300 text-black justify-between">
      <nav className="flex flex-row items-center w-full justify-between ">
        <div className="flex flex-row    ">
          <div className="px-2 font-bold">
            <Link to="/">Home</Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/demo/start/server-funcs">Start - Server Functions</Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/demo/start/api-request">Start - API Request</Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/demo/orpc-todo">oRPC Todo</Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/demo/tanstack-query">TanStack Query</Link>
          </div>{' '}
          <div className="px-2 font-bold">
            <Link to="/philis">PHILIS</Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/surreal">SurrealDB</Link>
          </div>
        </div>
        <div className="">
          <Select
            defaultValue={caseNumber ? String(caseNumber) : ''}
            onValueChange={(e) => {
              r({ to: '/case', search: { caseNumber: Number(e) } });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a case" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {jobs.map((job) => (
                  <SelectItem
                    key={job}
                    value={String(job)}
                    onSelect={() => {
                      r({ to: '/case', search: { caseNumber: job } });
                    }}
                  >
                    {job}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </nav>
    </header>
  );
}
