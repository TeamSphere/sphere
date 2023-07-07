package dao

import (
	"fmt"
	"time"
)

type Proposal struct {
	ID          int
	Title       string
	Description string
	Status      string
	Votes       []Vote
	CreatedAt   time.Time
}

type Vote struct {
	UserID     int
	ProposalID int
	Choice     string
}

var proposals []*Proposal

func CreateProposal(title, description string) (*Proposal, error) {
	newProposal := &Proposal{
		ID:          len(proposals) + 1,
		Title:       title,
		Description: description,
		Status:      "open",
		CreatedAt:   time.Now(),
	}

	proposals = append(proposals, newProposal)
	return newProposal, nil
}

func VoteOnProposal(userID, proposalID int, choice string) error {
	for _, proposal := range proposals {
		if proposal.ID == proposalID {
			newVote := Vote{
				UserID:     userID,
				ProposalID: proposalID,
				Choice:     choice,
			}

			proposal.Votes = append(proposal.Votes, newVote)
			return nil
		}
	}

	return fmt.Errorf("Proposal not found")
}

func GetProposal(proposalID int) (*Proposal, error) {
	for _, proposal := range proposals {
		if proposal.ID == proposalID {
			return proposal, nil
		}
	}

	return nil, fmt.Errorf("Proposal not found")
}

func ListProposals() ([]*Proposal, error) {
	return proposals, nil
}
