interface PanelProps {
  children: React.ReactNode;
}

export function CodePanel(props: PanelProps) {
  return (
    <div className="flex flex-col overflow-auto w-full h-auto border-1 border rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-400 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-900">
      {props.children}
    </div>
  );
}

interface CodeProps {
  text: string;
}

export function Code(props: CodeProps) {
  return <pre className="p-2 text-gray-400 text-sm">{props.text}</pre>;
}
