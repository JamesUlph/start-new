import { Link, useNavigate } from '@tanstack/react-router';
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectGroup,
} from './ui/select';

const jobs = [2000000, 2000100, 2007167, 2023490, 2023478, 2023487, 2023481];
export default function Header() {
  let r = useNavigate();
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
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
        </div>

        <Select
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
      </nav>
    </header>
  );
}
