import { AddButton } from './add';
import { SearchInput } from './search';

export function Bar() {
  return (
    <div className="flex gap-4">
      <div className="w-full">
        <SearchInput />
      </div>
      <div className="shrink-0">
        <AddButton />
      </div>
    </div>
  );
}
