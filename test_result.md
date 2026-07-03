#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build the full MVP baseline for BekasiGo, a public DMO (Destination Management Organization)
  website for Kota Bekasi with a separate internal CMS/admin panel. The platform includes public
  pages (Home, Discover, Destinations, Events, Stories, Blog) and a CMS with Login, Dashboard,
  Homepage Manager, Destinations Manager, and more (per Prompt Pack E-01..E-27+).

frontend:
  - task: "E-27 CMS Events Manager (List + Create + Edit + Delete + Publish)"
    implemented: true
    working: true
    file: "app/admin/events/page.js, app/admin/events/new/page.js, app/admin/events/[slug]/page.js, components/admin/EventsList.jsx, components/admin/EventForm.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: |
          Verified via screenshot tool at 1920x900:
          - /admin/events: toolbar (search + status pills + When dropdown + category select + New event),
            table with Event/When/Venue/Category/Status/Actions, star icon for featured, ongoing/upcoming/past
            micro-labels, delete confirm modal, publish/draft toggle via row menu.
          - /admin/events/new: sticky action bar (Save as draft / Publish + auto Preview when slug present),
            sections Basics / Content / Schedule (start+end date + time) / Location (Venue) / Media /
            Call to action (label+URL). Sidebar with Status radio + Featured switch.
          - /admin/events/[slug]: loads existing event, pre-fills startDate/endDate/time/venue, PUBLISHED
            pill, Featured switch ON for featured items, Danger Zone with Delete event button.
          - Added new DateField primitive (native input[type=date]) in components/admin/forms/inputs.jsx
          - Validation: title/slug/summary/venue/startDate/image required; endDate must be >= startDate;
            CTA URL must be http(s) if provided.

  - task: "E-26 CMS Destinations Manager (List + Create + Edit)"
    implemented: true
    working: true
    file: "app/admin/destinations/page.js, app/admin/destinations/new/page.js, app/admin/destinations/[slug]/page.js, components/admin/DestinationsList.jsx, components/admin/DestinationForm.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: |
          Verified via screenshot tool at 1920x900:
          - /admin/destinations: toolbar (search + status pills All/Published/Drafts + category select + New button),
            table with columns Destination/Category/District/Status/Rating/Actions, delete confirm modal wired.
          - /admin/destinations/new: sticky action bar with Save as draft / Publish, two-column layout,
            sections Basics / Descriptions / Location / Visit info / Media, sticky sidebar with Status
            radio, Featured switch, Planner priority slider.
          - /admin/destinations/[slug]: loads existing destination, shows PUBLISHED status pill, Featured toggle ON
            for featured items, Priority score 85, Danger zone with Delete button (edit mode only).
          - Fixed prefix overlap bug in TextField (slug field): switched from absolute overlay to attached
            input-group with cream chip and vertical divider — now shows "/destinations/" cleanly.

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 0
  run_ui: false

test_plan:
  current_focus:
    - "Awaiting user Prompt E-27 for next CMS module"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: |
      E-26 Destinations Manager complete and visually verified via screenshot tool.
      Also fixed a small UX bug: slug field prefix "/destinations/" was overlapping the input
      placeholder. Refactored TextField `prefix` variant to an attached input-group.
      Waiting for user to paste Prompt E-27 before proceeding.
