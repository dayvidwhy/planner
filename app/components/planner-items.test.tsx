import { expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlannerItems from "./planner-items";
import { formatDateForDisplay } from "@/lib/utils";

test("planner-items renders correct number of items with the right contents", async () => {
    // Mock data representing planned items
    const plannedItems = [
        {
            id: "1",
            summary: "Task 1",
            description: "Description for task 1",
            due: new Date("2022-03-21"),
        },
        {
            id: "2",
            summary: "Task 2",
            description: "Description for task 2",
            due: new Date("2022-03-22"),
        },
    ];

    // Mock deletePlannedItem function
    const deletePlannedItemMock = vi.fn();

    // Render the component with mock data
    render(<PlannerItems plannedItems={plannedItems} deletePlannedItem={deletePlannedItemMock} />);

    // Assertion: Check if each item is rendered with the correct content
    plannedItems.forEach((item, index) => {
        const summaryElement = screen.getByText(item.summary);
        expect(summaryElement).toBeTruthy();

        const descriptionElement = screen.getByText(item.description);
        expect(descriptionElement).toBeTruthy();
    
        const dueDateElement = screen.getByText(`Planned for ${formatDateForDisplay(item.due)}`);
        expect(dueDateElement).toBeTruthy();

        // Simulate click on delete button and verify deletePlannedItem function is called with correct ID
        const deleteButton = screen.getAllByTestId("delete-button")[index];
        fireEvent.click(deleteButton);
        expect(deletePlannedItemMock).toHaveBeenCalledWith(item.id);
    });
});
