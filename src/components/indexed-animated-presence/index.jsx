import { AnimatePresence, motion } from "motion/react";

export const IndexedAnimatePresence = ({ children, index }) => {
    const delay = 0.3 + index * 0.2;

    const variants = {
        hidden: {
            opacity: 0,
            translateY: -10,
        },
        visible: {
            opacity: 1,
            translateY: 0,
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{
                    opacity: { delay, duration: 0.25 },
                    translateY: { delay, duration: 0.5 },
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
