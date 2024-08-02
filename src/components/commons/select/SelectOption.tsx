import { motion } from 'framer-motion';

interface SelectOptionProps {
  value: string;
  label: string;
  onSelect: (value: string) => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  label,
  onSelect,
}) => (
  <motion.div
    className="cursor-pointer bg-white p-10 pl-12 hover:bg-gray-100"
    onClick={() => onSelect(value)}
  >
    {label}
  </motion.div>
);

export default SelectOption;
